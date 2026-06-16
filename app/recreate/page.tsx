'use client'

import React, { useState, useRef } from 'react'
import { Upload, Link as LinkIcon, Image as ImageIcon, ArrowRight } from 'lucide-react'
import AspectRatioSelector from '@/components/AspectRatioSelector'
import PreviewPanel from '@/components/PreviewPanel'
import { AspectRatio, IThumbnail } from '@/assets/data'
import { recreateThumbnailAction } from '@/lib/actions/thumbnail'

const RecreatePage = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [imageUrl, setImageUrl] = useState('')
  const [uploadedFile, setUploadedFile] = useState<{ base64: string; name: string } | null>(null)
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9')
  const [loading, setLoading] = useState(false)
  const [generatedThumbnail, setGeneratedThumbnail] = useState<IThumbnail | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadedFile({
        base64: reader.result as string,
        name: file.name,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleGenerate = async () => {
    const imageInput = activeTab === 'upload' ? uploadedFile?.base64 : imageUrl
    if (!imageInput) {
      alert('Please upload an image or paste an image URL first')
      return
    }

    setLoading(true)
    try {
      const result = await recreateThumbnailAction({
        imageInput,
        prompt,
        aspect_ratio: aspectRatio,
      })

      if (result.success && result.data) {
        // Map the backend Mongoose model response to IThumbnail props if needed
        const thumbnailData: IThumbnail = {
          id: result.data._id || '',
          title: result.data.title || '',
          image_url: result.data.image_url || '',
          style: result.data.style || 'Bold & Graphic',
          aspect_ratio: result.data.aspect_ratio || '16:9',
          color_scheme: result.data.color_scheme || 'Default',
          created_at: result.data.createdAt || new Date().toISOString(),
          prompt_used: result.data.prompt_used || '',
        }
        setGeneratedThumbnail(thumbnailData)
      } else {
        alert(result.message || 'Failed to generate thumbnail')
      }
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative flex flex-col items-center px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-48 min-h-screen pt-28 pb-20'>
      {/* Background Glow */}
      <div className='absolute top-40 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]'></div>
      <div className='absolute bottom-40 -z-10 right-1/4 size-72 bg-pink-600 blur-[300px] opacity-20'></div>

      <main className='mx-auto max-w-7xl w-full flex flex-col lg:flex-row gap-12 items-start'>
        {/* Left Panel: Form */}
        <div className='w-full lg:w-[550px] p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>AI Thumbnail Copy Maker</h1>
            <p className='text-zinc-400'>Upload an image or paste a URL and describe your changes</p>
          </div>

          {/* Tabs */}
          <div className='flex gap-2 p-1 bg-zinc-800/50 rounded-xl border border-white/5'>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'upload' ? 'bg-pink-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Upload size={18} />
              Upload
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'url' ? 'bg-pink-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LinkIcon size={18} />
              Image URL
            </button>
          </div>

          {/* Upload / URL Content */}
          <div className='space-y-4'>
            {activeTab === 'upload' ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className='group relative cursor-pointer'
              >
                <div className='flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-pink-500/50 transition-all p-4'>
                  {uploadedFile ? (
                    <div className='flex flex-col items-center text-center'>
                      <img src={uploadedFile.base64} alt="Uploaded thumbnail" className='h-12 w-20 object-cover rounded-md mb-1 border border-white/10' />
                      <p className='text-xs text-zinc-300 truncate max-w-[200px]'>{uploadedFile.name}</p>
                      <p className='text-[10px] text-zinc-500 hover:text-pink-400 mt-0.5'>Click to change image</p>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center pt-5 pb-6 text-zinc-400 group-hover:text-pink-400'>
                      <ImageIcon size={32} className='mb-2' />
                      <p className='text-sm'>Click to upload image</p>
                    </div>
                  )}
                  <input 
                    type='file' 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className='hidden' 
                  />
                </div>
              </div>
            ) : (
              <div className='space-y-2'>
                <label className='text-sm font-medium text-zinc-300'>Paste Image URL</label>
                <input
                  type='text'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder='https://example.com/thumbnail.png'
                  className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all'
                />
              </div>
            )}
          </div>

          {/* Change Description */}
          <div className='space-y-3'>
            <label className='text-sm font-medium text-zinc-300'>What do you want to change?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Change text, colors, expressions, style...'
              rows={4}
              className='w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none'
            />
          </div>

          {/* Aspect Ratio */}
          <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

          {/* Credit Info */}
          <div className='text-center'>
            <p className='text-xs text-zinc-300 tracking-widest '>10 Credits / per thumbnail generation</p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className='w-full py-4 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-lg shadow-lg shadow-pink-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading ? (
              <span className='animate-pulse'>Generating...</span>
            ) : (
              <>
                Recreate Thumbnail
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Right Panel: Preview */}
        <div className='flex-1 w-full space-y-6'>
          <div className='p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl shadow-2xl min-h-[500px] flex flex-col'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold text-white'>Preview</h2></div>

           
              <PreviewPanel thumbnail={generatedThumbnail} isLoading={loading} aspectRatio={aspectRatio} />
           
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecreatePage