import { useState, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { http } from "../Services/httpServices";
import "../Stylesheets/myMoves.css";
import MoveItem from "./MoveItem";

const MyMoves = () => {
  const [allMoves, setAllMoves] = useState([]);

  const fetchMoves = async () => {
    try {
      const res = await http.get("http://test.api.boxigo.in/sample-data/");
      setAllMoves(res.data.Customer_Estimate_Flow);
    } catch (error) {
      alert(`Error in Fetching Data!`);
      console.log(`Fetch Moves Data Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchMoves();
  }, []);

  return (
    <Container className="myMoves-container">
      <h4>My Moves</h4>
      <Stack spacing={2}>
        {allMoves.map((move, index) => (
          <Box key={index}>
             <MoveItem move={move} />
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default MyMoves;
