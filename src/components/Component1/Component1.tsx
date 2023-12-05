import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Post from "../../interfaces/Post";

const Component1: React.FC = () => {

  const [rows, setRows] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data: Post[]) => setRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 300, editable: true },
    { field: "body", headerName: "Body", width: 400, editable: true },
  ];

  return (
    <Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default Component1;
