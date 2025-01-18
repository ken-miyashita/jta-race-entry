import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Link,
  Paper,
} from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 5 }}>
        <h1>レース一覧（デバッグ用）</h1>
        <Link href="/race/1">2000 正月レガッタ</Link>
      </Paper>
    </Container>
  );
}
