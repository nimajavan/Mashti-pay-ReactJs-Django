import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useSelector} from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch} from 'react-redux'
import {UserLogoutAction} from '../actions/UserLoginAction'

function Header() {
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const LogoutHandler = (e) => {
    e.preventDefault()
    dispatch(UserLogoutAction())
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className='d-lg-flex justify-content-between w-100'>
            <Navbar.Brand href="#home">مشتی پی</Navbar.Brand>
            <Nav>
              <Nav.Link href="/dashboard">حساب کاربری</Nav.Link>
              <Nav.Link eventKey="link-1">وبلاگ</Nav.Link>
              <Nav.Link eventKey="link-2">درباره ما</Nav.Link>
            </Nav>
            <Nav>
              {
                userInfo ? (
                  <LinkContainer to="/login">
                    <Nav.Link onClick={LogoutHandler}>خروج</Nav.Link>
                  </LinkContainer>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>ورود</Nav.Link>
                  </LinkContainer>
                )
              }
              <LinkContainer to="/register">
              <Nav.Link>عضویت</Nav.Link>
              </LinkContainer>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header