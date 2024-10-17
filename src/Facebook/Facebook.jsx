import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

function Facebook() {
    const [faceboks, setFacebooks] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/facebook')
        .then((res) => setFacebooks(res.data))
    }, [])
  return (
    <div>
        {faceboks.map((fac) => (
            <p>{fac.email}</p>
        ))}
    </div>
  )
}

export default Facebook