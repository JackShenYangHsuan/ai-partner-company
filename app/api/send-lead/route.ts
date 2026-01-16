import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, youtubeUrl } = await request.json();

    // Validate inputs
    if (!email || !youtubeUrl) {
      return NextResponse.json(
        { error: '請填寫 Email 和 YouTube 連結' },
        { status: 400 }
      );
    }

    // Send email notification
    // Note: To send to multiple recipients (like janinechen0613@gmail.com),
    // verify a domain at resend.com/domains
    const { data, error } = await resend.emails.send({
      from: 'Rewire Lead <onboarding@resend.dev>',
      to: ['jackshen860302@gmail.com'],
      subject: `[Rewire 新客戶] 留言分析報告請求`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1A1A1A;">新的留言分析報告請求</h2>
          <p style="color: #6B6B6B;">有人在 Rewire 網站填寫了表單，請求留言分析報告：</p>

          <div style="background: #F7F5ED; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong>YouTube 影片連結:</strong> <a href="${youtubeUrl}">${youtubeUrl}</a></p>
          </div>

          <p style="color: #6B6B6B; font-size: 14px;">請盡快處理這個請求。</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: '發送失敗，請稍後再試' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '發生錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}
