if (window.zappyContactFormLoaded) {
  console.log('⚠️ Zappy: Contact form handler already loaded, skipping duplicate injection');
} else {
  window.zappyContactFormLoaded = true;

  document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        const hamburgerIcon = this.querySelector('.hamburger-icon');
        const closeIcon = this.querySelector('.close-icon');
        const isActive = this.classList.contains('active');
        
        if (isActive) {
          hamburgerIcon.style.display = 'block';
          closeIcon.style.display = 'none';
          this.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        } else {
          hamburgerIcon.style.display = 'none';
          closeIcon.style.display = 'block';
          this.classList.add('active');
          navMenu.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
      
      const navLinks = navMenu.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          const hamburgerIcon = mobileToggle.querySelector('.hamburger-icon');
          const closeIcon = mobileToggle.querySelector('.close-icon');
          hamburgerIcon.style.display = 'block';
          closeIcon.style.display = 'none';
          mobileToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
    
    const phoneHeaderBtn = document.querySelector('.phone-header-btn');
    if (phoneHeaderBtn) {
      phoneHeaderBtn.addEventListener('click', function() {
        const phoneNumber = '+972522972222';
        window.location.href = 'tel:' + phoneNumber;
      });
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          projectType: document.getElementById('projectType').value,
          message: document.getElementById('message').value
        };
        
        console.log('Form submitted:', formData);
        
        // Send to Zappy backend API
        (async function() {
          try {
            console.log('📧 Zappy: Sending contact form to backend...');
            const response = await fetch('https://api.zappy5.com/api/email/contact-form', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                websiteId: '57062aa2-dec4-454c-8801-70d32f209321',
                name: formData.name,
                email: formData.email,
                subject: formData.projectType ? 'Contact Form: ' + formData.projectType : 'Contact Form Submission',
                message: formData.message,
                phone: formData.phone || null
              })
            });
            const result = await response.json();
            console.log('✅ Zappy: Email sent successfully', result);
          } catch (error) {
            console.error('❌ Zappy: Failed to send email', error);
          }
        })();
        
        // Keep existing behavior
        alert('תודה על פנייתך! ניצור איתך קשר בהקדם.');
        contactForm.reset();
      });
    }
  });

  /* Cookie Consent */

  // Helper function to check cookie consent
  function hasConsentFor(category) {
    if (typeof window.CookieConsent === 'undefined') {
      return false;
    }
    
    return window.CookieConsent.validConsent(category);
  }

  // Helper function to execute code only with consent
  function withConsent(category, callback) {
    if (hasConsentFor(category)) {
      callback();
    } else {
      console.log(`[WARNING] Skipping ${category} code - no user consent`);
    }
  }

  // Cookie Consent Initialization

  (function() {
    'use strict';
    
    let initAttempts = 0;
    const maxAttempts = 50;
    
    function initCookieConsent() {
      initAttempts++;
      
      
      if (typeof window.CookieConsent === 'undefined') {
        if (initAttempts < maxAttempts) {
          setTimeout(initCookieConsent, 100);
        } else {
        }
        return;
      }

      const cc = window.CookieConsent;
      
      
      try {
        cc.run({
    "autoShow": true,
    "mode": "opt-in",
    "revision": 0,
    "categories": {
      "necessary": {
        "enabled": true,
        "readOnly": true
      },
      "analytics": {
        "enabled": false,
        "readOnly": false,
        "autoClear": {
          "cookies": [
            {
              "name": "_ga"
            },
            {
              "name": "_ga_*"
            },
            {
              "name": "_gid"
            },
            {
              "name": "_gat"
            }
          ]
        }
      },
      "marketing": {
        "enabled": false,
        "readOnly": false,
        "autoClear": {
          "cookies": [
            {
              "name": "_fbp"
            },
            {
              "name": "_fbc"
            },
            {
              "name": "fr"
            }
          ]
        }
      }
    },
    "language": {
      "default": "he",
      "translations": {
        "he": {
          "consentModal": {
            "title": "אנחנו משתמשים בעוגיות 🍪",
            "description": "ReginaSelaDesign משתמש בעוגיות כדי לשפר את החוויה שלך, לנתח שימוש באתר ולסייע במאמצי השיווק שלנו.",
            "acceptAllBtn": "אשר הכל",
            "acceptNecessaryBtn": "רק הכרחי",
            "showPreferencesBtn": "נהל העדפות",
            "footer": "<a href=\"#privacy-policy\">מדיניות פרטיות</a> | <a href=\"#terms-conditions\">תנאי שימוש</a>"
          },
          "preferencesModal": {
            "title": "העדפות עוגיות",
            "acceptAllBtn": "אשר הכל",
            "acceptNecessaryBtn": "רק הכרחי",
            "savePreferencesBtn": "שמור העדפות",
            "closeIconLabel": "סגור",
            "sections": [
              {
                "title": "עוגיות חיוניות",
                "description": "עוגיות אלה הכרחיות לתפקוד האתר ולא ניתן להשבית אותן.",
                "linkedCategory": "necessary"
              },
              {
                "title": "עוגיות ניתוח",
                "description": "עוגיות אלה עוזרות לנו להבין איך המבקרים מתקשרים עם האתר שלנו.",
                "linkedCategory": "analytics"
              },
              {
                "title": "עוגיות שיווקיות",
                "description": "עוגיות אלה משמשות להצגת פרסומות מותאמות אישית.",
                "linkedCategory": "marketing"
              }
            ]
          }
        }
      }
    },
    "guiOptions": {
      "consentModal": {
        "layout": "box",
        "position": "bottom right",
        "equalWeightButtons": true,
        "flipButtons": false
      },
      "preferencesModal": {
        "layout": "box",
        "equalWeightButtons": true,
        "flipButtons": false
      }
    }
  });
        
        if (typeof cc.onChange === 'function') {
          cc.onChange(function(cookie, changed_preferences) {
        
        if (changed_preferences.includes('analytics')) {
          if (cc.validConsent('analytics')) {
          } else {
          }
        }
        
        if (changed_preferences.includes('marketing')) {
          if (cc.validConsent('marketing')) {
          } else {
          }
        }
          });
        } else {
        }

      } catch (error) {
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCookieConsent);
      setTimeout(initCookieConsent, 1000);
    } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
      initCookieConsent();
    } else {
      setTimeout(initCookieConsent, 500);
    }
    
    if (typeof window !== 'undefined') {
      if (window.addEventListener) {
        window.addEventListener('load', initCookieConsent, { once: true });
      }
    }
  })();

  /* Accessibility Features */

  /* Mickidum Accessibility Toolbar Initialization - Zappy Style */

  window.onload = function() {
      
      try {
          window.micAccessTool = new MicAccessTool({
              buttonPosition: 'left',
              forceLang: 'he-IL',
              icon: {
                  position: {
                      bottom: { size: 50, units: 'px' },
                      left: { size: 20, units: 'px' },
                      type: 'fixed'
                  },
                  backgroundColor: 'transparent',
                  color: 'transparent',
                  img: 'accessible',
                  circular: false
              },
              menu: {
                  dimensions: {
                      width: { size: 300, units: 'px' },
                      height: { size: 'auto', units: 'px' }
                  }
              }
          });
          
      } catch (error) {
      }
      
      document.addEventListener('keydown', function(event) {
          var isAltOrOption = event.altKey || event.metaKey;
          var isAKey = event.keyCode === 65 || event.which === 65 || 
                        (event.key && (event.key.toLowerCase() === 'a' || event.key === 'å' || event.key === 'Å'));
          
          if (isAltOrOption && isAKey) {
              if (window.innerWidth > 768) {
                  event.preventDefault();
                  event.stopPropagation();
                  
                  var isVisible = document.body.classList.contains('accessibility-widget-visible');
                  
                  if (isVisible) {
                      document.body.classList.remove('accessibility-widget-visible');
                  } else {
                      document.body.classList.add('accessibility-widget-visible');
                      
                      setTimeout(function() {
                          var accessButton = document.getElementById('mic-access-tool-general-button');
                          if (accessButton) {
                              accessButton.click();
                          }
                      }, 200);
                  }
              }
          }
      }, true);
  };
}