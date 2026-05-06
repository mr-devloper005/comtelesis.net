"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center text-white/60">
        No posts yet for this section.
      </div>
    );
  }

  const isArticle = task === 'article';

  if (isArticle) {
    const featuredPost = merged[0];
    const remainingPosts = merged.slice(1);
    const featuredLocalOnly = (featuredPost as any).localOnly;
    const featuredHref = featuredLocalOnly
      ? `/local/${task}/${featuredPost.slug}`
      : buildPostUrl(task, featuredPost.slug);

    return (
      <div className="grid gap-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          <TaskPostCard post={featuredPost} href={featuredHref} taskKey={task} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map((post) => {
            const localOnly = (post as any).localOnly;
            const href = localOnly
              ? `/local/${task}/${post.slug}`
              : buildPostUrl(task, post.slug);
            return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
