import { ReactComponent as M0 } from "../svgs/m0.svg";
import { ReactComponent as M1 } from "../svgs/m1.svg";
import { ReactComponent as M2 } from "../svgs/m2.svg";
import { ReactComponent as M3 } from "../svgs/m3.svg";

export const ChooseSvg = (size) => {
  if (size < 50) {
    return <M3 className="asteroid-svg" />;
  } else if (size > 50 && size < 100) {
    return <M1 className="asteroid-svg" />;
  } else if (size > 100 && size < 150) {
    return <M0 className="asteroid-svg" />;
  } else {
    return <M2 className="asteroid-svg" />;
  }
};
