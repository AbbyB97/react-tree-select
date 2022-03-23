import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import tagsData from "../data/tags-data";
import CheckboxTree from "react-checkbox-tree";
import { BsCheckCircle, BsCircle, BsArrowRight } from "react-icons/bs";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Icon } from "@chakra-ui/react";

import {
  FaCheckSquare,
  FaSquare,
  FaChevronRight,
  FaChevronDown,
  FaPlusSquare,
  FaMinusSquare,
  FaFolder,
  FaFolderOpen,
  FaFile,
} from "react-icons/fa";

const nodes = [
  {
    value: "mars",
    label: "Mars",
    children: [
      { value: "phobos", label: "Phobos" },
      { value: "deimos", label: "Deimos" },
    ],
  },
];

const MultiTag = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [tagsNode, setTagsNode] = useState([]);
  console.log("data tags=", tagsData.data.getAllTags.subjects);
  console.log("checked", checked);
  console.log("expanded", expanded);

  useEffect(() => {
    const tagsNodeTemp = tagsData.data.getAllTags.subjects.map((subject) => ({
      value: subject._id,
      label: subject.name,
      children: subject.units.map((unit) => ({
        value: unit._id,
        label: unit.name,
        children: unit.topics.map((topic) => ({
          value: topic._id,
          label: topic.name,
          children: topic.superTopics.map((superTopic) => ({
            value: superTopic._id,
            label: superTopic.name,
            children: superTopic.subTopics.map((subTopic) => ({
              value: subTopic._id,
              label: subTopic.name,
            })),
          })),
        })),
      })),
    }));
    setTagsNode(tagsNodeTemp);
  }, []);

  return (
    <Box>
      <Text align="center" fontWeight="bold" fontSize="x-large">
        MultiTag POC
      </Text>
      <Box mb={5} w="25rem">
        <Input onChange={filterChange} placeholder="Search Tags" size="md" />
      </Box>

      <Flex justify="left">
        <CheckboxTree
          nodes={tagsNode}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={{
            check: <Icon as={FaCheckSquare} />,
            uncheck: <Icon as={FaSquare} />,
            halfCheck: <Icon as={FaCheckSquare} />,
            expandClose: <Icon as={FaChevronRight} />,
            expandOpen: <Icon as={FaChevronDown} />,
            expandAll: <Icon as={FaPlusSquare} />,
            collapseAll: <Icon as={FaMinusSquare} />,
            parentClose: <Icon as={FaFolder} />,
            parentOpen: <Icon as={FaFolderOpen} />,
            leaf: <Icon as={FaFile} />,
          }}
        />
      </Flex>
    </Box>
  );
};

export default MultiTag;
