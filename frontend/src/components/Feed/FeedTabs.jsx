import { useState } from "react";
import PropTypes from "prop-types";

import { Tabs, Tab, Box } from "@mui/material";
import { InlinePlaceholder } from "../Common/InlinePlaceholder";

export const FeedTabs = ({ onTabChange, children }) => {
    const [tab, setTab] = useState(0);

    const handleChange = (_e, newValue) => {
        setTab(newValue);
        if (onTabChange) onTabChange(newValue);
    };

    return (
        <>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="fullWidth"
                    textColor="inherit"
                >
                    <Tab
                        label="Para ti"
                        disableRipple
                        disableFocusRipple
                        sx={{
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#E6E6E7" },
                            "&.Mui-selected": {
                                fontWeight: "bold",
                                fontSize: "1.05rem",
                            },
                        }}
                    />
                    <Tab
                        label="Siguiendo"
                        disableRipple
                        disableFocusRipple
                        sx={{
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#E6E6E7" },
                            "&.Mui-selected": {
                                fontWeight: "bold",
                                fontSize: "1.05rem",
                            },
                        }}
                    />
                </Tabs>
            </Box>

            {tab === 0 ? children : <InlinePlaceholder title="Siguiendo" />}
        </>
    );
};

FeedTabs.propTypes = {
    onTabChange: PropTypes.func,
    children: PropTypes.node,
};
