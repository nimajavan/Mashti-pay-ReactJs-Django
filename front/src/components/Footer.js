import React from 'react'
import {Row, Col, Container, Stack} from 'react-bootstrap'


function Footer() {
  return (
    <footer style={{'right':0, 'left':0, 'bottom':0, 'position':'absolute'}}>
        <Container fluid className='text-white pt-4'>
            <Row>
                <Col lg={4} md={12} className="text-center">
                <Stack gap={3}>
                    <h3>دباره ما</h3>
                    <p>صرافی مشتی پی در حوزه خدمات خرید و فروش پرفکت مانی فعالیت خود را از سال 1400 شروع کرده و امیدواریم در کنار شما بهترین تجربه خرید و فروش را رقم بزنیم</p>
                </Stack>
                </Col>
                <Col lg={4} md={12}>
                <Stack gap={3}>
                    <h3>دباره ما</h3>
                    <p>صرافی مشتی پی در حوزه خدمات خرید و فروش پرفکت مانی فعالیت خود را از سال 1400 شروع کرده و امیدواریم در کنار شما بهترین تجربه خرید و فروش را رقم بزنیم</p>
                </Stack>
                </Col>
                <Col lg={4} md={12}>
                <Stack gap={3}>
                    <h3>دباره ما</h3>
                    <p>صرافی مشتی پی در حوزه خدمات خرید و فروش پرفکت مانی فعالیت خود را از سال 1400 شروع کرده و امیدواریم در کنار شما بهترین تجربه خرید و فروش را رقم بزنیم</p>
                </Stack>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer;