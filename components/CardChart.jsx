import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';

export default function CardInvertedColors({actual}) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setValue(((actual*1)/25)*100);
  }, [actual]);
  return (
    <Card variant="solid" color="" invertedColors sx={{ height: 120 }}>
      <CardContent orientation="horizontal">
        <CircularProgress sx={{ '--CircularProgress-size': '80px' }} determinate value={value}>
          <AddHomeWorkIcon/>
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">ลักษณะอาคารทั้งหมด</Typography>
          <Typography level="h2">{actual}/25</Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
}
