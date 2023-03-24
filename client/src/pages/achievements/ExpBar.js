export default function ExpBar(props) {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 22,
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 8,
    fontWeight: "bold",
    whiteSpace: "nowrap",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
}
