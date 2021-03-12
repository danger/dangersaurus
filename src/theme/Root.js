import React, { useEffect } from "react"
import { setupTwoslashHovers } from "shiki-twoslash/dist/dom";

// Default implementation, that you can customize
function Root({children}) {
  useEffect(setupTwoslashHovers, [])

  return <div id="ok"><>{children}</></div>;
}

export default Root;
