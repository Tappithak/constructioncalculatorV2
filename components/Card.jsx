import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';



export default function InteractiveCard({title,group,setLayout,setHeader}) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 320,
        height: 120,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
      onClick={() => {setLayout('fullscreen'),setHeader(title)}}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <Image src={
          group == "อาคาร" ? "/icon/building.png" :
          group == "บ้าน" ? "/icon/home-.png" :
          group == "โรง" ? "/icon/roung-.png" :
          group == "กราบ" ? "/icon/grab.png" : "/icon/other-100.png"

        } alt='image'  objectFit="cover" width={90} height={90}/>
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
         {title}
        </Typography>
      </CardContent>
    </Card>
  );
}