import React from "react";
import CustomChip from "./CustomChip";
import { TableCell, TableRow, Grid } from "@material-ui/core";

const TagGroup = (props) => {
  return (
    <>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          className={props.classes.cellB}
          style={{ border: 0 }}
        >
          {props.tagGroup}
        </TableCell>
      </TableRow>
      <TableRow>
        <Grid container style={{ marginLeft: "1rem" }}>
          {props.tags
            .sort((a, b) => {
              if (a.name < b.name) return -1;
              return 1;
            })
            .map((tag, index) => {
              return (
                <Grid
                  item
                  xs="auto"
                  align="left"
                  style={{
                    paddingLeft: "0.2rem",
                    paddingRight: "0.2rem",
                  }}
                  className={props.classes.cell}
                >
                  <CustomChip
                    tag={tag}
                    classes={props.classes}
                    addToSelected={props.addToSelected}
                    removeFromSelected={props.removeFromSelected}
                    tagsSelected={props.tagsSelected}
                  />
                </Grid>
                // </li>
              );
            })}
        </Grid>
      </TableRow>
    </>
  );
};

export default TagGroup;
