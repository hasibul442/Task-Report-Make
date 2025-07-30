import { Editor } from '@monaco-editor/react'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { getLanguage, getOption } from '../../../Helper/Helper';
import AppBar from './AppBar';

function Details() {
	const { id } = useParams();
	const [note, setNote] = useState("");
	const [lang, setLang] = useState("");
	const [fileName, setFileName] = useState("");


	const getNote = async () => {
		const docRef = doc(db, 'notes', id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setNote(docSnap.data().note);
			const fileNames = docSnap.data().name;
			const fileExtension = fileNames.split('.').pop();
			const language = getLanguage(fileExtension);
			setLang(language);
			setFileName(fileNames);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}
	useEffect(() => {
		getNote();
	}, [id]);
	return (
		<>
			<section className='container-fluid mt-3'>
				<div className='d-flex justify-content-end'>
					<a href="/notes" className='btn btn-primary'>
						Back
					</a>
					{/* <a href={`/notes/edit/${id}`} className='btn btn-secondary ms-2'>
						Edit
					</a> */}
				</div>

				<AppBar fileName={fileName} />
				<div style={{ height: '80vh', width: '100%' }} className='mb-2'>
					<Editor
						height="100%"
						defaultLanguage={lang}
						language={lang}
						defaultValue={note}
						theme="vs-dark"
						value={note}
						onChange={setNote}
						options={getOption()}
					/>
				</div>

				<div className='d-flex justify-content-end'>
					<a href="/notes" className='btn btn-primary'>
						Back
					</a>
					{/* <a href={`/notes/edit/${id}`} className='btn btn-secondary ms-2'>
						Edit
					</a> */}
				</div>
			</section>
		</>
	)
}

export default Details