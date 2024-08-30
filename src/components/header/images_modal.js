import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ListGroup } from 'react-bootstrap';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth < 967 ? 350 : 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function ImagesModal({ isOpen, handleClose, openAiClient }) {
  const [prompt, setPrompt] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [image, setImage] = React.useState("");

  const generateImage = async () => {
    try {
      const response = await openAiClient.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
      });
      const image_url = response.data[0].url;
      setImage(image_url);
      setImages([response.data[0].url, ...images ]);
      setPrompt("");
      console.log("🚀 ~ generateImage ~ image_url:", image_url)
    } catch (error) {
      console.error(error.message); 
    }
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Generate Images
          </Typography>
          <TextField 
            label="Prompt" 
            variant="standard" 
            fullWidth 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            onKeyDown={(e) => (e.key === "Enter") ? generateImage() : null}
          />
          <br />
          <br />
          {image && <img src={image} alt='falha' style={{ maxWidth: "100%", maxHeight: "500px" }} />}
          {images.length > 0 && (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px", maxWidth: style.width, overflowX: "scroll" }}>
              {images.map((i) => (<img key={i} onClick={() => setImage(i)} src={i} alt='falha' style={{ maxWidth: "100%", maxHeight: "100px" }} />))}
            </div>
          ) 
          }
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Button variant='contained' onClick={generateImage}>
            Generate
          </Button>
          </div>
        
        </Box>
      </Modal>
    </div>
  );
}
