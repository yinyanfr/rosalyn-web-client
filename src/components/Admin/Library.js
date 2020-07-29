import React from 'react'
import LibraryForm from './LibraryForm'
import LibraryTable from './LibraryTable'

const Library = () => {

    return (
        <div>
            <h1>Library Repositories Management</h1>
            <LibraryForm />
            <LibraryTable />
        </div>
    )
}

export default Library
