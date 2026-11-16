import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

export const Blog: React.FC = () => {
  const { selectedBlogId, navigateTo } = useNavigation();
  const [activePostId, setActivePostId] = useState<number | null>(selectedBlogId);

  const activePost = activePostId ? BLOG_POSTS.find((p) => p.id === activePostId) : null;

  if (activePost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        <button
          onClick={() => setActivePostId(null)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-rose-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todos los artículos</span>
        </button>

        <article className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
              {activePost.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {activePost.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {activePost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTime}
              </span>
            </div>
          </div>

          <div className="aspect-16/9 rounded-2xl overflow-hidden bg-stone-100">
            <img
              src={activePost.image}
              alt={activePost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-stone text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 pt-4">
            <p className="font-medium text-stone-900 text-base">
              {activePost.summary}
            </p>
            <p>{activePost.content}</p>
            <p>
              Recuerda que en <strong>Edith Sandra – Regalos & Detalles</strong> estamos siempre a tu disposición para asesorarte personalmente sobre la mejor combinación de flores, chocolates y dedicatorias para tu ocasión especial en Ácora.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => navigateTo('tienda')}
              className="bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs px-6 py-2.5 rounded-full cursor-pointer transition-colors"
            >
              Ver regalos recomendados
            </button>
            <button
              onClick={() => setActivePostId(null)}
              className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              Cerrar artículo
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Inspiración & Consejos</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Blog de Regalos & Momentos
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Guías, ideas creativas y consejos para elegir y personalizar el detalle perfecto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => setActivePostId(post.id)}
            className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-lg hover:border-rose-300 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="aspect-16/10 w-full bg-stone-100 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-semibold text-rose-700 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-rose-800 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-rose-700">
                <span>Leer artículo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
