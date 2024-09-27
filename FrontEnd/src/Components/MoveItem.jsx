import React, { useState, useEffect } from "react";
import { Box, Container, Divider, Button, Badge } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHouse,
  faCubesStacked,
  faLocationDot,
  faTruckFast,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../Stylesheets/MoveItem.css";

const MoveItem = (props) => {
  const { move } = props;
  const [showDetails, setShowDetails] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Function to format the order date
  function formatOrderDate(orderDate) {
    const dateObj = new Date(orderDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  }

  useEffect(() => {
    let totalQty = 0;
    const filteredInventory = move.items.inventory
      .map((item) => {
        const filteredCategories = item.category
          .map((cat) => {
            const filteredItems = cat.items
              .filter((i) => i.qty > 0)
              .map((i) => {
                // Add 'type' information for each filtered item
                return {
                  ...i,
                  type: i.type, // Ensuring 'type' is included
                };
              });

            totalQty += filteredItems.reduce((sum, i) => sum + i.qty, 0);
            return {
              ...cat,
              items: filteredItems,
            };
          })
          .filter((cat) => cat.items.length > 0);

        return { ...item, category: filteredCategories };
      })
      .filter((item) => item.category.length > 0);

    setFilteredItems(filteredInventory);
    setTotalItems(totalQty);
  }, [move]);

  return (
    <>
      <Container className="move-row-container">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="32%">
            <div>
              <b>From</b>
            </div>
            <div className="container-text limit-words move-moving-from">
              {move.moving_from}
            </div>
          </Box>

          <Box display="flex" justifyContent="center" width="8%">
            <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ef553b" }} />
          </Box>

          <Box width="32%">
            <div>
              <b>To</b>
            </div>
            <div className="container-text limit-words move-moving-from">
              {move.moving_to}
            </div>
          </Box>

          <Box width="28%" className="request-hash-box">
            <div>
              <b>Request#</b>
            </div>
            <div style={{ color: "#ef553b" }}>
              <b>{move.estimate_id}</b>
            </div>
          </Box>
        </Box>
      </Container>

      <Container className="move-row-container">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            width="12%"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faHouse}
              style={{
                color: "#ef553b",
                marginRight: "7px",
              }}
              size="xl"
            />
            <div>{move.property_size}</div>
          </Box>
          <Box
            width="12%"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faCubesStacked}
              style={{
                color: "#ef553b",
                marginRight: "7px",
              }}
              size="xl"
            />
            <div>{totalItems}</div>
          </Box>
          <Box
            width="12%"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ marginRight: "5px", color: "#ef553b" }}
              size="xl"
            />
            <div>{move.distance}</div>
          </Box>

          <Box
            width="25%"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faTruckFast}
              style={{ marginRight: "5px", color: "#ef553b" }}
              size="xl"
            />
            <div>{formatOrderDate(move.order_date)}</div>
          </Box>
          <Box display="flex" alignItems="center" width="15%">
            <label>
              <input
                type="checkbox"
                checked={move.move_date_flexible === 1}
                readOnly
              />
              Is flexible
            </label>
          </Box>
          <Box width="20%">
            <Button className="view-move-details-btn" onClick={toggleDetails}>
              View move details
            </Button>
          </Box>
          <Box width="20%">
            <Button className="quotes-awaiting-btn">Quotes Awaiting</Button>
          </Box>
        </Box>
      </Container>

      <Container>
        <Box width="80%">
          <span
            className="move-disclaimer"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ marginRight: "5px", color: "#ef553b" }} 
              size="l"
            />
            <b>Disclaimer: </b> Please update your move two days before shifting
          </span>
        </Box>
      </Container>

      {showDetails && (
        <>
          <Container style={{"marginTop" : "10px"}}>
            <Box display="flex" justifyContent="space-between">
              <span>
                <b>Inventory Details</b>
              </span>
              <Button className="move-edit-inventory-btn">
                Edit Inventory
              </Button>
            </Box>

            <Container style={{ padding: "0px", marginTop: "20px" }}>
              {filteredItems.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    className="accordion-summary"
                  >
                    {item.displayName}
                    <div>
                      <Badge
                        badgeContent={item.category.reduce(
                          (sum, cat) =>
                            sum +
                            cat.items.reduce((catSum, i) => catSum + i.qty, 0),
                          0
                        )}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: "#ef553b",
                            color: "white",
                          },
                        }}
                        className="category-count-badge"
                      />
                    </div>
                  </AccordionSummary>

                  <AccordionDetails
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    {item.category.map((cat, catIndex) => (
                      <Container key={catIndex}>
                        <h4>{cat.displayName}</h4>
                        {cat.items.map((i, iIndex) => (
                          <Box
                            key={iIndex}
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            marginBottom="6px"
                          >
                            <Box>
                              <div>{i.displayName}</div>
                              <div className="item-type">
                                {i.type.find((x) => x.selected)?.option || ""}
                              </div>
                            </Box>
                            <Box>{i.qty}</Box>
                          </Box>
                        ))}
                      </Container>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Container>
          </Container>

          <br />

          <Container>
            <Box display="flex" justifyContent="space-between">
              <span>
                <b>House Details</b>
              </span>
              <Button className="move-edit-house-details-btn">
                Edit House Details
              </Button>
            </Box>

            <Container style={{ padding: "0px" }}>
              <div className="move-existing-house-header">
                Existing House Details
              </div>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box width="20%">
                  <div>
                    <b>Floor No.</b>
                  </div>
                  <div className="container-text">{move.old_floor_no}</div>
                </Box>
                <Box width="20%">
                  <div>
                    <b>Elevator Available</b>
                  </div>
                  <div className="container-text">
                    {move.old_elevator_availability}
                  </div>
                </Box>
                <Box width="20%">
                  <div>
                    <b>Packing Required</b>
                  </div>
                  <div className="container-text">{move.packing_service}</div>
                </Box>
                <Box width="30%">
                  <div>
                    <b>Distance from truck to door</b>
                  </div>
                  <div className="container-text">
                    {move.old_parking_distance}
                  </div>
                </Box>
              </Box>
            </Container>

            <br />
            <Divider />

            <Container style={{ padding: "0px" }}>
              <div className="move-existing-house-header">
                New House Details
              </div>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box width="20%">
                  <div>
                    <b>Floor No.</b>
                  </div>
                  <div className="container-text">{move.new_floor_no}</div>
                </Box>
                <Box width="20%">
                  <div>
                    <b>Elevator Available</b>
                  </div>
                  <div className="container-text">
                    {move.new_elevator_availability}
                  </div>
                </Box>
                <Box width="20%">
                  <div>
                    <b>Packing Required</b>
                  </div>
                  <div className="container-text">{move.unpacking_service}</div>
                </Box>
                <Box width="30%">
                  <div>
                    <b>Distance from truck to door</b>
                  </div>
                  <div className="container-text">
                    {move.new_parking_distance}
                  </div>
                </Box>
              </Box>
            </Container>
          </Container>
        </>
      )}

      <br />
      <Divider />
    </>
  );
};

export default MoveItem;
