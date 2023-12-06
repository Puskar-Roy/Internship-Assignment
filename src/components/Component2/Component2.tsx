import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Collapse } from "@mui/material";
import initialDepartments from "../../utils/Data";

interface Props {}

const Component2: React.FC<Props> = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [openSubDepartments, setOpenSubDepartments] = useState<string[]>([]);

  const handleToggleDepartment = (department: string) => {
    const isDepartmentSelected = selectedDepartments.includes(department);

    let newSelectedDepartments: string[] = [...selectedDepartments];

    if (isDepartmentSelected) {
      newSelectedDepartments = newSelectedDepartments.filter(
        (dep) =>
          dep !== department &&
          !initialDepartments
            .find((d) => d.department === department)
            ?.sub_departments.includes(dep)
      );
    } else {
      newSelectedDepartments.push(
        department,
        ...(initialDepartments.find((d) => d.department === department)
          ?.sub_departments || [])
      );
    }

    setSelectedDepartments(newSelectedDepartments);
  };

  const handleToggleSubDepartments = (department: string) => {
    const currentIndex = openSubDepartments.indexOf(department);
    const newOpenSubDepartments = [...openSubDepartments];

    if (currentIndex === -1) {
      newOpenSubDepartments.push(department);
    } else {
      newOpenSubDepartments.splice(currentIndex, 1);
    }

    setOpenSubDepartments(newOpenSubDepartments);
  };

  const areAllSubDepartmentsSelected = (department: string) => {
    const subDepartments = initialDepartments.find(
      (d) => d.department === department
    )?.sub_departments;

    return (
      subDepartments &&
      subDepartments.every((subDep) => selectedDepartments.includes(subDep))
    );
  };

  return (
    <List>
      {initialDepartments.map((department) => (
        <React.Fragment key={department.department}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                icon={<ChevronRightIcon />}
                checkedIcon={<ExpandMoreIcon />}
                checked={openSubDepartments.includes(department.department)}
                onChange={() =>
                  handleToggleSubDepartments(department.department)
                }
              />
            </ListItemIcon>
            <Checkbox
              edge="start"
              checked={
                selectedDepartments.includes(department.department) ||
                areAllSubDepartmentsSelected(department.department)
              }
              onChange={() => handleToggleDepartment(department.department)}
            />
            <ListItemText
              primary={`${department.department} (${department.sub_departments.length})`}
            />
          </ListItem>
          <Collapse
            in={openSubDepartments.includes(department.department)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {department.sub_departments.map((subDepartment) => (
                <ListItem key={subDepartment} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedDepartments.includes(subDepartment)}
                      onChange={() => handleToggleDepartment(subDepartment)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Component2;
