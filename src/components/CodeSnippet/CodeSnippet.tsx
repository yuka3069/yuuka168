import React from "react";
import { Code } from "bright";

import theme from "./theme";
import styles from "./CodeSnippet.module.css";

//TODO: test props variables
function CodeSnippet(props: React.ComponentProps<typeof Code>) {
  return <Code {...props} theme={theme} className={styles.wrapper} />;
}

export default CodeSnippet;
