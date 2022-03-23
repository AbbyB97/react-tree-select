import React, { useState, useEffect } from "react";

import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import tagsData from "../data/tags-data";

const data = {
  label: "search me",
  value: "searchme",
  children: [
    {
      label: "search me too",
      value: "searchmetoo",
      children: [
        {
          label: "No one can get me",
          value: "anonymous",
        },
      ],
    },
  ],
};

const ReactDropDownSelect = () => {
  const [tagsNode, setTagsNode] = useState([]);

  const onChange = (currentNode, selectedNodes) => {
    console.log("currentNode::", currentNode);
    console.log("selectedNodes",selectedNodes);
  };
  const onAction = (node, action) => {
    console.log("onAction::", action, node);
  };
  const onNodeToggle = (currentNode) => {
    console.log("onNodeToggle::", currentNode);
  };

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
    <DropdownTreeSelect
      data={tagsNode}
      onChange={onChange}
      //   hierarchical={true}
      keepTreeOnSearch
      keepChildrenOnSearch
      showPartiallySelected={true}
      onAction={onAction}
      onNodeToggle={onNodeToggle}
    />
  );
};

export default ReactDropDownSelect;

// ReactDOM.render(
//   <DropdownTreeSelect data={data} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />,
//   document.body
// ) // in real world, you'd want to render to an element, instead of body.
