package com.nontonskuy.tv

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.webkit.*
import android.widget.ProgressBar
import androidx.fragment.app.FragmentActivity

class MainActivity : FragmentActivity() {

    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar

    private val TARGET_URL = "https://movie.balee.web.id"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        progressBar = findViewById(R.id.progressBar)
        webView = findViewById(R.id.webView)

        webView.apply {
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                mediaPlaybackRequiresUserGesture = false
                useWideViewPort = true
                loadWithOverviewMode = true
                builtInZoomControls = false
                displayZoomControls = false
                setSupportMultipleWindows(false)
                cacheMode = WebSettings.LOAD_DEFAULT
                // TV user agent agar site tahu device type
                userAgentString = "$userAgentString NontonSkuyTV/1.0 AndroidTV"
            }

            setLayerType(View.LAYER_TYPE_HARDWARE, null)
            isFocusable = true
            isFocusableInTouchMode = true

            webViewClient = object : WebViewClient() {
                override fun onPageStarted(view: WebView, url: String, favicon: Bitmap?) {
                    progressBar.visibility = View.VISIBLE
                }

                override fun onPageFinished(view: WebView, url: String) {
                    progressBar.visibility = View.GONE
                    // Inject CSS untuk D-pad focus visibility
                    injectFocusCSS()
                }

                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val url = request.url.toString()
                    // Buka link eksternal (stream embed) di webview yang sama
                    return false
                }
            }

            webChromeClient = object : WebChromeClient() {
                override fun onProgressChanged(view: WebView, newProgress: Int) {
                    progressBar.progress = newProgress
                    if (newProgress == 100) progressBar.visibility = View.GONE
                }
            }

            loadUrl(TARGET_URL)
        }
    }

    // Tambah CSS agar elemen terfokus terlihat saat navigasi D-pad
    private fun injectFocusCSS() {
        val css = """
            *:focus {
                outline: 3px solid #3b82f6 !important;
                outline-offset: 2px !important;
            }
            a:focus, button:focus, [tabindex]:focus {
                box-shadow: 0 0 0 3px rgba(59,130,246,0.6) !important;
            }
        """.trimIndent().replace("\n", " ")

        webView.evaluateJavascript("""
            (function() {
                var style = document.getElementById('tv-focus-style');
                if (!style) {
                    style = document.createElement('style');
                    style.id = 'tv-focus-style';
                    document.head.appendChild(style);
                }
                style.textContent = '$css';
            })();
        """.trimIndent(), null)
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        // Tombol Back → kembali ke halaman sebelumnya di WebView
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack()
            return true
        }
        return super.onKeyDown(keyCode, event)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}
