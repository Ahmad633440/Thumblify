import { AspectRatio, IThumbnail } from '@/assets/data';
import { DownloadIcon, ImageIcon, Loader2Icon } from 'lucide-react';
import React from 'react'

const PreviewPanel = ({thumbnail, isLoading, aspectRatio} : {thumbnail: IThumbnail | null; isLoading: boolean; aspectRatio: AspectRatio  }) => {

const aspectClasses = {
  '16:9' : 'aspect-video',
  '1:1' : 'aspect-square',
  '9:16' : 'aspect-9/16',
} as Record<AspectRatio, string >

// download button for downloading generated thumbnail
const onDownload = ()=>{
  if(!thumbnail?.image_url) return
  window.open(thumbnail.image_url, '_blank') 
}

  return (
    <div className='relative w-full h-full flex flex-col'>
      <div className={`relative w-full h-full overflow-hidden rounded-xl bg-black/20 ${aspectClasses[aspectRatio]}`}>
        {/* LOADING STATE */}
        {isLoading && (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25'>
          <Loader2Icon className='size-8 animate-spin text-zinc-400'/>
          {/* <LoaderCircleIcon /> */}
          <div className='text-center'>
            <p className='text-sm font-medium text-zinc-200'>Generating Image...</p>
            <p className='mt-1 text-xs text-zinc-400'>This may take 10-20 seconds</p>
          </div>
        </div>
       )}

       {/* loading is false and thumbnail is also get false*/}
       {!isLoading && thumbnail?.image_url && (

        <div className='group relative h-full w-full'>
        <img src={thumbnail?.image_url} alt={thumbnail.title} className='h-full w-full object-cover '/>

        <div>
          <button type='button' className='button-style' onClick={onDownload}>
           <DownloadIcon className='size-4'/>
           Download Thumbnail
          </button>
        </div>
        </div>
       )}

      {/*incase we don't have any thumbnail / empty State  */}
      {!isLoading && !thumbnail?.image_url && (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/40 bg-black/30 p-4 text-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white/10'>
            <ImageIcon className='h-10 w-10 text-white opacity-50'/>
          </div>
          <div className='px-4 text-center'>
            <p className='font-medium text-zinc-200'>Generate your first thumbnail</p>
            <p className='mt-1 text-xs text-zinc-400'>Fill out the form and click Generate</p>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default PreviewPanel