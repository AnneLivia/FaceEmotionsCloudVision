import { ProgressBar, Col, Row } from 'react-bootstrap';

const BarEmotion = ({ likelihood, label }) => {
  const LIKELIHOOD = {
    UNKNOWN: {
      value: 0,
      variant: 'light',
    },
    VERY_UNLIKELY: {
      value: 20,
      variant: 'secondary',
    },
    UNLIKELY: {
      value: 40,
      variant: 'dark',
    },
    POSSIBLE: {
      value: 60,
      variant: 'warning',
    },
    LIKELY: {
      value: 80,
      variant: 'primary',
    },
    VERY_LIKELY: {
      value: 100,
      variant: 'success',
    },
  };

  return (
    LIKELIHOOD[likelihood] && (
      <Row>
        <Col className='fw-bold mb-2' md={3}>
          {label}
        </Col>
        <Col className='mt-1'>
          <ProgressBar
            variant={LIKELIHOOD[likelihood].variant}
            now={LIKELIHOOD[likelihood].value}
            label={`${LIKELIHOOD[likelihood].value} %`}
            style={{
              fontSize: 16,
            }}
          />
        </Col>
      </Row>
    )
  );
};

export default BarEmotion;
