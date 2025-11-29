import { colors } from "./colors.js";
import { spacing } from "./spacing.js";
import { border } from "./border.js";
import { font } from "./typography.js";


export const buttons = {
  primary: {
    backgroundColor: colors.base.primary,
    color: "#fff",
    border: "none",
    padding: "6px 16px",
    fontSize: 13,
    borderRadius: 16,
    fontWeight: font.weight.medium,
    cursor: "pointer"
  },
  secondary: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "1px solid #ccc",
    padding: "6px 14px",
    fontSize: 13,
    borderRadius: 16,
    fontWeight: font.weight.medium,
    cursor: "pointer"
  }
};
