import React, { useState } from 'react'
import SearchAppBar from '../Layouts/appbar'
import NoteList from '../TodoList/note-list'

function Home() {

    return (
        <div>
            <SearchAppBar />

            <NoteList />
        </div>
    )
}

export default Home
