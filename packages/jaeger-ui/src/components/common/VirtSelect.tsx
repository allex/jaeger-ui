// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-find-dom-node */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Select } from 'antd';

type RenderArrowArgs = {
  isOpen: boolean;
};

const Option = Select.Option;

type VirtSelectProps = {
  value?: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange(e: string): void;
};

const isEmpty = (v?: string) => v === '' || v == null;

export default function VirtSelect(props: VirtSelectProps) {
  const { options, value, clearable, ...dest } = props;

  // fix <Select /> `showClear` not work when `value` present
  const setRef =
    clearable && props.onChange
      ? (elem: Select<string>) => {
          const node = elem && ReactDOM.findDOMNode(elem);
          if (node && node.nodeType === 1) {
            const clearHook = (node as HTMLElement).querySelector('.ant-select-selection__clear');
            if (clearHook) {
              (clearHook as any).onclick = () => props.onChange('');
            }
          }
        }
      : () => {};

  return (
    <Select ref={setRef} value={isEmpty(value) ? undefined : value} allowClear={!!clearable} {...dest}>
      {options.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
}
