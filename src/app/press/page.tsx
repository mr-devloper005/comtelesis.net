'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { Download, ExternalLink, FileImage, Newspaper } from 'lucide-react'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press"
      description="Brand assets, media resources, and selected coverage of ComTelesis."
      actions={
        <Button variant="outline" asChild className="border-[#002D62]/30 text-[#002D62] hover:bg-[#002D62]/5">
          <Link href="/newsroom">
            Newsroom updates
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-stretch">
          <Card className="border-[#002D62]/15 shadow-none">
            <CardContent className="space-y-4 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#002D62]/10 text-[#002D62]">
                  <FileImage className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#002D62]">Press kit</h2>
                  <p className="text-sm text-[#70757A]">Approved logos, screens, and short-form descriptions.</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#70757A]">
                Use these materials for broadcast, print, and digital stories. Prefer the primary logo on light
                backgrounds; request alternate lockups from communications if your layout requires a reversed treatment.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#002D62]/15 bg-gradient-to-br from-[#002D62]/5 to-transparent shadow-none">
            <CardContent className="flex h-full flex-col justify-center p-8">
              <Newspaper className="h-8 w-8 text-[#002D62]" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-[#002D62]">Boilerplate</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#70757A]">
                ComTelesis is an independent editorial publication focused on connectivity, infrastructure, and the
                policies shaping how people and businesses get online.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#002D62]">Downloadable assets</h3>
          <p className="mt-1 text-sm text-[#70757A]">Preview before download; file types match production exports.</p>
          <div className="mt-6 space-y-3">
            {mockPressAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col gap-4 rounded-xl border border-[#002D62]/15 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#002D62]">{asset.title}</p>
                  <p className="mt-1 text-sm text-[#70757A]">{asset.description}</p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="bg-[#002D62]/10 text-[#002D62]">
                    {asset.fileType}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-[#002D62]/25" onClick={() => setActiveAssetId(asset.id)}>
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#002D62] text-white hover:bg-[#002D62]/90"
                    onClick={() =>
                      toast({
                        title: 'Download started',
                        description: `${asset.title} is downloading.`,
                      })
                    }
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#002D62]">Press coverage</h3>
          <p className="mt-1 text-sm text-[#70757A]">Selected mentions and partner stories.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {mockPressCoverage.map((item) => (
              <Card
                key={item.id}
                className="border-l-4 border-l-[#002D62] border-t-[#002D62]/15 border-r-[#002D62]/15 border-b-[#002D62]/15 shadow-none transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#002D62]/80">{item.outlet}</p>
                  <p className="mt-3 text-sm font-medium leading-snug text-[#002D62]">{item.headline}</p>
                  <p className="mt-3 text-xs text-[#70757A]">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#002D62]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[#002D62]/15 bg-muted">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-[#70757A]">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="bg-[#002D62] text-white hover:bg-[#002D62]/90"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
