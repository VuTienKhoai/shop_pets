import React from 'react'
import { useParams } from 'react-router-dom';
import Page_Content_Products from '../componnents/Page_Content_Products';

export default function Detail_Category() {
    const { id } = useParams();
    return (
        <div className='mt-header'>
            <Page_Content_Products id_category={id} />
        </div>
    )
}
