import React from 'react'
import { Input } from 'semantic-ui-react'
import "./index.css"

const Busca = () => (
    <div className='buscar'>
        <Input
        size='mini'
            action={{ color: 'blue', content: 'Buscar' }}
            icon='search'
            iconPosition='left'
            placeholder='Buscar...'
        />

    </div>
)

export default Busca