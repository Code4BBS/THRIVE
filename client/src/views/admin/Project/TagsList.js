import React, { useState, useEffect } from "react";
import axios from "axios";
import { clone } from "ramda";
import TagGroup from "../customer/CustomerListView/TagGroup";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Table,
  Button,
  Input,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  makeStyles,
  InputAdornment,
  SvgIcon,
  Container,
  InputBase,
} from "@material-ui/core";

import componentStyles from "assets/theme/views/admin/tables.js";
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles(componentStyles);

const TagList = ({ tags, hide, getTags, tagsSelected }) => {
  const classes = useStyles();
  const [selectedTags, setSelectedTags] = useState(tagsSelected);
  const [search, setSearch] = useState("");
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [sortedTags, setSortedTags] = useState([]);
  const [processedTags, setProcessTags] = useState(false);
  // let navigate = useNavigate();

  const displayFilterPane = () => {
    setSelectedTags([]);
    if (!processedTags) {
      let tagMap = {};
      for (let tag of tags) {
        tagMap[tag.group] = [];
      }
      for (let tag of tags) {
        tagMap[tag.group].push(tag);
      }
      let tagMapArray = [];
      for (let group in tagMap) {
        tagMapArray.push({ name: group, tags: tagMap[group] });
      }
      setSortedTags(tagMapArray);
      setProcessTags(true);
    }
    setFilterVisibility(true);
  };

  useEffect(() => displayFilterPane(), []);

  const addToSelected = (tagID) => {
    let newSelection = clone(selectedTags);
    newSelection.push(tagID);
    setSelectedTags(newSelection);
  };

  const removeFromSelected = (tagID) => {
    let newSelection = clone(selectedTags);
    let index = newSelection.indexOf(tagID);
    if (index > -1) {
      newSelection.splice(index, 1);
      setSelectedTags(newSelection);
    }
  };
  const sendSelectedTags = () => {
    getTags(selectedTags);
  };

  return (
    <Box mt={3}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardContent style={{ padding: 20 }}>
          <Grid container spacing={3}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  {sortedTags.map((group, index) => {
                    return (
                      <TagGroup
                        key={index}
                        classes={classes}
                        tagGroup={group.name}
                        tags={group.tags}
                        addToSelected={addToSelected}
                        removeFromSelected={removeFromSelected}
                        tagsSelected={tagsSelected}
                      />
                    );
                  })}
                  <TableRow>
                    <TableCell align="left" className={classes.cell}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ alignSelf: "left" }}
                        onClick={sendSelectedTags}
                      >
                        Selected
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={hide}
                        style={{ alignSelf: "left" }}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TagList;
