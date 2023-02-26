import { useState } from 'react';
import { Col, Row, Form, Button, InputGroup, Image } from 'react-bootstrap';
import CustomCard from '../../components/Card';
import defaultImage from '../../assets/default_image.jpg';
import axios from '../../service/api.js';
import { toast } from 'react-toastify';

import BarEmotion from './BarEmotion';

const Painel = () => {
  const defaultEmotions = {
    joyLikelihood: 'UNKNOWN',
    sorrowLikelihood: 'UNKNOWN',
    angerLikelihood: 'UNKNOWN',
    surpriseLikelihood: 'UNKNOWN',
  };

  const [image, setImage] = useState(defaultImage);
  const [emotions, setEmotions] = useState({
    joyLikelihood: 'VERY_UNLIKELY',
    sorrowLikelihood: 'VERY_UNLIKELY',
    angerLikelihood: 'VERY_UNLIKELY',
    surpriseLikelihood: 'LIKELY',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.image.files[0]) {
      const formData = new FormData();
      formData.append('image', event.target.image.files[0]);
      try {
        const response = await axios.post('/?option=FACE_DETECTION', formData);

        if (!response.data.result[0]) {
          setEmotions({
            ...defaultEmotions,
          });
          throw new Error(
            'Não foi possível identificar uma emoção. Tente com outra imagem!'
          );
        }

        setEmotions({
          joyLikelihood: response.data.result[0].joyLikelihood,
          sorrowLikelihood: response.data.result[0].sorrowLikelihood,
          angerLikelihood: response.data.result[0].angerLikelihood,
          surpriseLikelihood: response.data.result[0].surpriseLikelihood,
        });
      } catch (err) {
        if (err.message === 'Network Error') {
          return toast.error(
            'Erro de conexão com o servidor. Tente novamente mais tarde!'
          );
        }
        console.error(err);
        toast.error(err.message);
      }
    }
  };

  return (
    <CustomCard borderColor='#fff'>
      <Row className='justify-content-center'>
        <Col md={5} className='mb-2'>
          <h2 className='text-center'>What's the face emotion?</h2>
          <Image
            id='image'
            fluid
            width={500}
            height={430}
            src={image}
            alt='An image uploaded by the user'
            className='d-block mx-auto rounded'
            thumbnail
          />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={5} className='mb-2'>
          <Form
            onSubmit={handleSubmit}
            encType='multipart/form-data'
            className='text-center mt-1'
          >
            <InputGroup className='mb-3'>
              <Form.Control
                size='sm'
                type='file'
                name='image'
                accept='.png, .jpg, .jpeg'
                onChange={(e) => {
                  return setImage(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <Button
                className='text-nowrap'
                size='sm'
                variant='dark'
                type='submit'
              >
                Identify
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col md={5} className='mb-2 text-center'>
          <BarEmotion likelihood={emotions.joyLikelihood} label='Joy' />
          <BarEmotion likelihood={emotions.angerLikelihood} label='Anger' />
          <BarEmotion likelihood={emotions.sorrowLikelihood} label='Sorrow' />
          <BarEmotion
            likelihood={emotions.surpriseLikelihood}
            label='Surprised'
          />
        </Col>
      </Row>
    </CustomCard>
  );
};
export default Painel;
