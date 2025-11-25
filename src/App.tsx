import { Button } from "./components/Button/Button";
import { Checkbox } from "./components/Checkbox/Checkbox";
import { Text } from "./components/Text/Text";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Text tone="brand" size="2xl" weight="bold">
        YONG UI
      </Text>
      <Button variant="solid">Toss</Button>
      <Checkbox tone="brand" id="checkbox" label="체크박스" />
    </div>
  );
}

export default App;
