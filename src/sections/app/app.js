import { Grid, Typography, Button, Card, CardContent, CardMedia, CardActions, Chip } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import Lottie from 'lottie-react';
import axios from 'axios';
import * as ImagenPlanta from './assets/planta.json';

//   const WebcamCapture = () => (

//   );

function PaginaPrincipal() {
  const convertBase64 = (file) =>
    new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } catch (error) {
        console.log('Mira: ', error);
      }
    });

  const webcamRef = useRef(null);
  const [Imagen, setImagen] = useState(null);
  const [imagenBase64, setImagenBase64] = useState('');
  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setImgSrc(imageSrc);
  // }, [webcamRef, setImgSrc]);

  const enviarImagen = async (e) => {
    const imagenf = await convertBase64(e.target.files[0]);
    setImagen(e.target.files[0]);
    setImagenBase64(imagenf);
  };
  const [datosRespuesta, setDatosRespuesta] = useState({
    nombre: '',
    porcentaje: '',
  });

  const enviarApi = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', Imagen);
    const { data } = await axios.post('http://127.0.0.1:8000/patatas', bodyFormData);
    console.log(data);
    setDatosRespuesta({
      nombre: data.class,
      porcentaje: data.confidence,
    });
  };
  useEffect(() => {
    enviarApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Imagen]);

  const validarNombre = (tipo) => {
    const nombresValidos = {
      'Late Blight': 'Enfermedad Tardía del Tizón',
      'Early Blight': 'Enfermedad Hongo Alternaria solani',
    };

    return nombresValidos[tipo] ? nombresValidos[tipo] : 'Enfermedades o daños causados por papas';
  };
  const validarDescripcion = (tipo) => {
    const nombresValidos = {
      'Late Blight':
        'La Potato Late Blight (Tardía) es causada por el hongo Phytophthora infestans. Esta enfermedad es mucho más grave que la Early Blight y puede causar una rápida degradación de las hojas y los tallos de la planta de papa. Las lesiones aparecen como manchas de agua gris-verdosas que se vuelven marrones. La enfermedad se propaga rápidamente y puede destruir una cosecha completa en cuestión de días.',
      'Early Blight':
        'La Potato Early Blight (Temprana) es causada por el hongo Alternaria solani. Los síntomas de la enfermedad incluyen manchas marrones en las hojas, que pueden extenderse a los tallos y los tubérculos de la papa. La enfermedad suele aparecer temprano en la temporada y puede afectar el rendimiento de la cosecha si no se controla adecuadamente.',
    };

    return nombresValidos[tipo] ? nombresValidos[tipo] : 'Es una hoja de Patata sana no presenta enfermedad alguna';
  };

  // console.log(imagenBase64);
  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4} sm={12}>
              <Lottie animationData={ImagenPlanta} width={80} height={80} />
            </Grid>
            <Grid item xs={8} sm={12}>
              <Typography variant="h3">PatataDoc</Typography>
              <Typography variant="body1">
                Verifica que tus hojas de patatas estén bien con PatataDoc. Comienza ahora.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button fullWidth variant="contained" onClick={() => console.log('Tomar foto')}>
                Tomar foto
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button fullWidth component="label" variant="contained">
                Cargar foto
                <input accept="image/*" type="file" multiple hidden onChange={(e) => enviarImagen(e)} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container justifyContent="center" alignItems="center">
            {imagenBase64 ? (
              <Card sx={{ maxWidth: 800 }}>
                <CardMedia sx={{ minHeight: 500, minWidth: 500 }} image={imagenBase64} title="Imagen de la planta" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {validarNombre(datosRespuesta.nombre)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {validarDescripcion(datosRespuesta.nombre)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Compartir</Button>
                  <Button size="small">Más información</Button>
                </CardActions>
              </Card>
            ) : (
              <Chip label="Sube una foto para ver los resultados" />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

/*

      <Grid container item justifyContent="center" md={12}>
        <Card sx={{ maxWidth: 345 }}>
       
          <CardMedia sx={{ height: 400 }} image={imagenBase64} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid> 

*/

export default PaginaPrincipal;
