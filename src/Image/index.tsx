import type { ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { staged } from 'staged-components';
import { getBlobUrl } from '../utils/blob-source';
import { NativeProps, withNativeProps } from '../utils/native-props';
import { toCSSLength } from '../utils/to-css-length';
import { useIsomorphicUpdateLayoutEffect } from '../utils/use-isomorphic-update-layout-effect';
import { mergeProps } from '../utils/with-default-props';
import { BrokenImageIcon } from './broken-image-icon';
import { ImageIcon } from './image-icon';
import './index.scss';
import { LazyDetector } from './lazy-detector';
const classPrefix = `adm-image`;

export type ImageProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholder?: ReactNode;
  fallback?: ReactNode;
  lazy?: boolean;
  draggable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onContainerClick?: (event: React.MouseEvent<HTMLDivElement, Event>) => void;
} & NativeProps<'--width' | '--height'> &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'crossOrigin' | 'decoding' | 'loading' | 'referrerPolicy' | 'sizes' | 'srcSet' | 'useMap' | 'id'
  >;

const defaultProps = {
  fit: 'fill',
  placeholder: (
    <div className={`${classPrefix}-tip`}>
      <ImageIcon />
    </div>
  ),
  fallback: (
    <div className={`${classPrefix}-tip`}>
      <BrokenImageIcon />
    </div>
  ),
  lazy: false,
  draggable: false,
};

export const Image = staged<ImageProps>((p) => {
  const props = mergeProps(defaultProps, p);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [blobUrl, setBlobUrl] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  let src: string | undefined = blobUrl;
  let srcSet: string | undefined = blobUrl;

  useIsomorphicUpdateLayoutEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);
  const onActive = () => {
    getBlobUrl(props.src || '').then((blobUrl) => {
      setBlobUrl(blobUrl);
    });
  };
  useEffect(() => {
    // for nextjs ssr
    // if (imgRef.current?.complete) {
    //   setLoaded(true);
    // }
    if (!props.lazy) {
      onActive();
    }
  }, []);

  const style: ImageProps['style'] = {};
  if (props.width) {
    style['--width'] = toCSSLength(props.width);
    style['width'] = toCSSLength(props.width);
  }
  if (props.height) {
    style['--height'] = toCSSLength(props.height);
    style['height'] = toCSSLength(props.height);
  }

  const onLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setLoaded(true);
    props.onLoad?.(e);
  };
  const onError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setFailed(true);
    props.onError?.(e);
  };
  return withNativeProps(
    props,
    <div ref={ref} className={classPrefix} style={style} onClick={props.onContainerClick}>
      {props.lazy && <LazyDetector onActive={onActive} />}
      {failed ? (
        props.fallback
      ) : (
        <>
          {!loaded && props.placeholder}
          <img
            ref={imgRef}
            id={props.id}
            className={`${classPrefix}-img`}
            src={src}
            alt={props.alt}
            onClick={props.onClick}
            onLoad={onLoad}
            onError={onError}
            style={{
              objectFit: props.fit,
              display: loaded ? 'block' : 'none',
            }}
            crossOrigin={props.crossOrigin}
            decoding={props.decoding}
            loading={props.loading}
            referrerPolicy={props.referrerPolicy}
            sizes={props.sizes}
            srcSet={srcSet}
            useMap={props.useMap}
            draggable={props.draggable}
          />
        </>
      )}
    </div>,
  );
});
