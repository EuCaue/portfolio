'use client';

import { IconArrowUpRight, IconCopy, IconCheck } from '@tabler/icons-react';
import DynamicIcon from './DynamicIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import { useScopedI18n } from '@/locales/client';

type TabProps = {
  tabName: string;
  href: string;
  hrefContent: string;
  iconName: string;
};

export default function Tab({
  tabName,
  href,
  hrefContent,
  iconName
}: TabProps): JSX.Element {
  const scopedT = useScopedI18n('contact');
  const iconSize = 24;
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <>
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label={tabName}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <div className="grid grid-cols-3 gap-4 items-center">
          <span title={iconName}>
            <DynamicIcon
              ICON_SIZE={iconSize}
              name={iconName}
            />
          </span>

          <a
            className="link justify-self-center w-48"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={scopedT('openContactLink', {
              social: tabName
            })}
            title={scopedT('openContactLink', {
              social: tabName
            })}
          >
            {hrefContent}
          </a>

          <div className="col-span-3 md:col-span-1 justify-self-center self-center ">
            <CopyToClipboard
              text={hrefContent}
              onCopy={() => {
                if (copied) return;
                setCopied(!copied);
                setTimeout(() => {
                  setCopied(false);
                }, 800);
              }}
            >
              <button
                className="btn btn-ghost btn-sm"
                title={scopedT('copyButton')}
                aria-label={scopedT('copyButton')}
              >
                {copied ? (
                  <IconCheck
                    size={iconSize}
                    aria-hidden
                  />
                ) : (
                  <IconCopy
                    size={iconSize}
                    aria-hidden
                  />
                )}
              </button>
            </CopyToClipboard>

            <span
              className="tooltip tooltip-top tooltip-info"
              data-tip={scopedT('tooltipContactLink', { social: tabName })}
            aria-label={scopedT('openContactLink', {
              social: tabName
            })}

            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <IconArrowUpRight size={iconSize} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
