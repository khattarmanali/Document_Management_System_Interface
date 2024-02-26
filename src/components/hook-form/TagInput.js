import React, { useState, useEffect, useContext } from "react";
import { TextField, Chip, Autocomplete } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import fetchInputTags from "../../services/fileServices";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles(() => ({
  chip: {
    margin: "2px",
  },
}));

const TagInput = ({
  name,
  existingTagsEndpoint,
  onSaveTag,
  handleDeleteTag,
}) => {
  const { control } = useFormContext();
  const { dispatch, state } = useContext(UserContext);

  const classes = useStyles();
  const [existingTags, setExistingTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  console.log("existingTags", state);
  useEffect(() => {
    // Fetch existing tags from the endpoint
    fetchExistingTags();
  }, [existingTagsEndpoint, state?.token]);

  const fetchExistingTags = async () => {
    try {
      const response = await fetchInputTags(state?.token);
      console.log("response", response);
      setExistingTags(response?.data);
    } catch (error) {
      console.error("Error fetching existing tags:", error);
    }
  };

  const handleTagInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  const handleTagAdd = () => {
    if (inputValue.trim() !== "" && !selectedTags.includes(inputValue)) {
      setSelectedTags([...selectedTags, inputValue.trim()]);
      onSaveTag(inputValue.trim());
    }
    setInputValue("");
  };

  const deleteTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    handleDeleteTag(tag);
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={existingTags}
            value={inputValue}
            onChange={handleTagInputChange}
            inputValue={inputValue}
            onInputChange={handleTagInputChange}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add Tag"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleTagAdd();
                  }
                }}
                helperText="Press Enter to add a tag and click to see existing tags"
              />
            )}
          />
        )}
      />
      <div>
        {selectedTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            className={classes.chip}
            onDelete={() => deleteTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};

TagInput.propTypes = {
  name: PropTypes.string.isRequired,
  existingTagsEndpoint: PropTypes.array.isRequired,
  onSaveTag: PropTypes.func.isRequired,
};

export default TagInput;
