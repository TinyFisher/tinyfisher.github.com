---
layout: post
title: C# 自定义 下拉框
category: cs
tags: [C#, combobox]
keywords: C#, combobox
description: C#自定义设置边框下拉框
---

    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Windows.Forms;
    using System.Drawing;

    namespace Custom
    {
        public class CustomComBoBox : ComboBox
        {
            private Color borderColor;

            /// &lt;summary&gt;
            /// 边框颜色
            /// &lt;/summary&gt;
            public Color BorderColor
            {
                get { return borderColor; }
                set { borderColor = value; }
            }

            protected override void WndProc(ref Message m)
            {
                base.WndProc(ref m);
                ControlPaint.DrawBorder(this.CreateGraphics(), this.ClientRectangle, this.BorderColor, ButtonBorderStyle.Solid);
            } 
        }
    }

