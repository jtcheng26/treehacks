/* Credit: https://github.com/davidhu2000/react-spinners
  edited to use inline styles instead of emotion in order to minimize bundle size
 */
import React from "react";
import { sizeMarginDefaults, cssValue } from "./helpers";
// import { LoaderSizeMarginProps } from "./interfaces";

class Loader extends React.PureComponent {
  static defaultProps = sizeMarginDefaults(15);

  style = (i) => {
    const { color, size, margin, speedMultiplier } = this.props;

    return {
      display: "inline-block",
      backgroundColor: color,
      width: cssValue(size),
      height: cssValue(size),
      margin: cssValue(margin),
      borderRadius: "100%",
      animationName: "beat-load",
      animationDuration: `${0.7 / speedMultiplier}s`,
      animationDelay: i % 2 ? "0s" : `${0.35 / speedMultiplier}s`,
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
      animationFillMode: "both",
    };
  };

  render() {
    const { loading } = this.props;

    return loading ? (
      <div>
        <span style={this.style(1)} />
        <span style={this.style(2)} />
        <span style={this.style(3)} />
      </div>
    ) : null;
  }
}

export default Loader;
