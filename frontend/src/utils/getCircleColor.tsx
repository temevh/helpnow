export default function getCircleColor(status: string) {
  switch (status) {
    case "OPEN":
      return "#38A169"; // green.500
    case "ACCEPTED":
      return "#ECC94B"; // yellow.400
    case "COMPLETED":
      return "#3182CE"; // blue.600
    case "CLOSED":
      return "#E53E3E"; // red.600
    default:
      return "#A0AEC0"; // gray.400
  }
}
