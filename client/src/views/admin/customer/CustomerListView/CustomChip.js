import React, { useState, useEffect } from "react";
import { Chip } from "@material-ui/core";

const CustomChip = (props) => {
  const [variant, setVariant] = useState("outlined");

  useEffect(() => {
    if (props.tagsSelected && props.tagsSelected.includes(props.tag._id)) {
      setVariant("default");
    }
  }, []);

  let toggle = () => {
    if (variant === "outlined") {
      setVariant("default");
      props.addToSelected(props.tag._id);
    } else {
      setVariant("outlined");
      props.removeFromSelected(props.tag._id);
    }
  };

  return (
    <Chip
      label={props.tag.name}
      className={props.classes.chip}
      size="small"
      clickable
      onClick={toggle}
      variant={variant}
      style={{ margin: "2px" }}
      color="primary"
    />
  );
};

export default CustomChip;
