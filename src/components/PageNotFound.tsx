import React from 'react'
import {Navigate, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const NavigateTo = useNavigate();
  return (
    NavigateTo("/")
  )
}

export default PageNotFound