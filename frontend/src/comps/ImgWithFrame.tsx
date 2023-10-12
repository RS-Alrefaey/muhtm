import React from 'react'

type ImageWithFrameProps = {
    imageUrl: string
    altText?: string
}

function ImageWithFrame({ imageUrl, altText = 'Image with frame' }: ImageWithFrameProps) {
    return (
        <div className='w-fit '>
            <div className='relative'>
                <div
                    className='absolute inset-0 light-blue-bg bg-opacity-80 -translate-x-7 -translate-y-5 rounded-3xl  w-[500px] h-[300px]'>
                </div>
                <img src={imageUrl} alt={altText} className='relative z-20 w-[500px] h-[300px] object-cover rounded-3xl' />
            </div>
        </div>
    )
}

export default ImageWithFrame
