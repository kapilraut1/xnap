import * as React from "react";
import Graph from "react-vis-network-graph";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { minCashFlowRec } from "../../../algorithm/minCashflow";

const SettlementGraphModal = ({ isOpen, onClose, group, expenses }) => {
  const options = {
    height: "500px",
    nodes: {
      color: "#ffffff",
      fixed: false,
      font: "16px arial black",
      scaling: {
        label: true,
      },
      shadow: true,
      shape: "circle",
      margin: 10,
    },
    edges: {
      arrows: "to",
      color: "black",
      scaling: {
        label: true,
      },
      shadow: true,
    },
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 150,
        nodeSpacing: 500,
        treeSpacing: 500,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        shakeTowards: "roots", // roots, leaves
      },
    },
  };

  const graph = useMemo(() => {
    let edges = [];
    let nodes = [];
    if (group) {
      let splitObject = group.split?.[0] || {};
      // group?.groupMembers.forEach((member) => {
      //   splitObject[member] = 0;
      // });
      // expenses.forEach((curr) => {
      //   const { expenseOwner, expenseAmount } = curr;
      //   if (splitObject.hasOwnProperty(expenseOwner)) {
      //     splitObject[expenseOwner] += expenseAmount;
      //   }
      // });
      // splitObject = expenses.reduce((acc, curr) => {

      //   return acc;
      // }, splitObject);

      nodes = Object.keys(splitObject).map((key, value) => {
        return {
          id: value.toString(),
          label: key.slice(0, 5) + "...",
          title: key,
        };
      });
      const investment = Object.values(splitObject) || [];
      edges = minCashFlowRec(investment);
    }
    return { edges, nodes };
  }, [expenses]);

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <Box
        sx={{
          minWidth: "70vw",
          minHeight: "80vh",
        }}
      >
        <DialogTitle>Settlement Graph for {group.groupName}</DialogTitle>
        <Graph graph={graph} options={options} getNetwork={(network) => {}} />
        {/* <div>
          {graph.edges &&
            group &&
            graph.edges.map((edge, index) => {
              return (
                <p key={index}>
                  {Object.keys(group.split[0])[edge.from]} has to pay{" "}
                  {edge.label} to {Object.keys(group.split[0])[edge.to]}
                </p>
              );
            })}
        </div> */}
      </Box>
    </Dialog>
  );
};

export default SettlementGraphModal;
