import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
//components
import Linegraph from "../Linegraph/Linegraph";

//assets
import btc from "../../assets/btc.png";

//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ProjectTable = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [projects] = useState(
    cookies.get("projects") ? cookies.get("projects") : ""
  );
  console.log(projects);
  return (
    <>
      <div className="cryptotable">
        <TableContainer className="tablecontainer" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="headingrow">
                <TableCell
                  className="tableheadings"
                  style={{ textAlign: "left" }}
                >
                  Project Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects &&
                projects.map((project, index) => (
                  <TableRow
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/fundproject/${index}`)}
                  >
                    <TableCell
                      className="tablerowcell"
                      component="th"
                      scope="row"
                      style={{ textAlign: "left" }}
                    >
                      {project.name}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ProjectTable;
