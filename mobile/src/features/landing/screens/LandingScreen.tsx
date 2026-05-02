import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/theme/brandColors';

const NAV_LINKS = ['Features', 'Analysis', 'Inventory', 'Pricing'] as const;

const BAR_MAX = 140;
const BAR_RATIOS = [0.4, 0.55, 0.7, 0.6, 0.85, 0.75, 0.95];

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <View style={styles.headerTopRow}>
            <View style={styles.logoRow}>
              <Text style={styles.logoWordmark}>less.</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginBtn}>
                <Text style={styles.loginBtnText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/register')}
                style={styles.getStartedBtn}
                activeOpacity={0.85}
              >
                <Text style={styles.getStartedBtnText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.navScroll}
          >
            {NAV_LINKS.map((label, i) => (
              <TouchableOpacity key={label} activeOpacity={0.7}>
                <Text style={[styles.navLink, i === 0 && styles.navLinkActive]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionPad}>
          <View style={styles.pill}>
            <Ionicons name="sparkles" size={14} color={Brand.onSecondaryContainer} />
            <Text style={styles.pillText}>Essential intelligence for restaurateurs</Text>
          </View>
          <Text style={styles.h1}>
            Make smarter menu pricing decisions with <Text style={styles.h1Accent}>less.</Text> effort
          </Text>
          <Text style={styles.bodyLg}>
            {`Streamline your kitchen's profitability with OCR receipt processing and automated food cost analysis. Focus on the craft, we'll handle the margins.`}
          </Text>
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.primaryCta} activeOpacity={0.9}>
              <Text style={styles.primaryCtaText}>Start Your Analysis</Text>
              <Ionicons name="arrow-forward" size={18} color={Brand.onPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryCta} activeOpacity={0.9}>
              <Text style={styles.secondaryCtaText}>View Demo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroImageWrap}>
          <LinearGradient
            colors={['rgba(209,229,204,0.35)', 'transparent']}
            style={styles.heroGlow}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          />
          <View style={styles.heroCard}>
            <Image
              source={require('@/assets/hero-preview.png')}
              style={styles.heroImage}
              contentFit="cover"
              accessibilityLabel="App preview"
            />
          </View>
        </View>

        <View style={styles.processSection}>
          <Text style={styles.h2Center}>Simplifying your daily workflow</Text>
          <Text style={styles.subCenter}>
            Automating the tedious math so you can get back to the table. Our three-step process keeps your
            margins healthy and your data fresh.
          </Text>
          <View style={styles.processCards}>
            <View style={styles.processCard}>
              <View style={styles.processIcon}>
                <Ionicons name="camera" size={22} color={Brand.onSecondaryContainer} />
              </View>
              <Text style={styles.h3}>OCR Scanning</Text>
              <Text style={styles.cardBody}>
                Snap a photo of your supplier receipts. Our intelligent OCR instantly extracts ingredient prices
                and updates your database.
              </Text>
            </View>
            <View style={styles.processCard}>
              <View style={styles.processIcon}>
                <Ionicons name="calculator" size={22} color={Brand.onSecondaryContainer} />
              </View>
              <Text style={styles.h3}>Cost Analysis</Text>
              <Text style={styles.cardBody}>
                System auto-calculates precise food costs for every dish based on your latest real-time inventory
                and supplier prices.
              </Text>
            </View>
            <View style={styles.processCard}>
              <View style={styles.processIcon}>
                <Ionicons name="stats-chart" size={22} color={Brand.onSecondaryContainer} />
              </View>
              <Text style={styles.h3}>Price Recommender</Text>
              <Text style={styles.cardBody}>
                Get smart suggestions to adjust menu prices dynamically, ensuring you always hit your target profit
                margins.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionPad}>
          <View style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <View>
                <Text style={styles.h3}>Profit Margin Trends</Text>
                <Text style={styles.caption}>Monthly comparison view</Text>
              </View>
              <View style={styles.livePill}>
                <Text style={styles.livePillText}>Live Data</Text>
              </View>
            </View>
            <View style={styles.barRow}>
              {BAR_RATIOS.map((h, i) => (
                <View key={i} style={styles.barCell}>
                  <View
                    style={[
                      styles.barFill,
                      { height: BAR_MAX * h },
                      (i === 2 || i === 4 || i === 6) && styles.barFillAccent,
                    ]}
                  />
                </View>
              ))}
            </View>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Avg Margin</Text>
                <Text style={[styles.statValue, { color: Brand.primary }]}>32.4%</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Cost Delta</Text>
                <Text style={[styles.statValue, { color: Brand.error }]}>-4.2%</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Status</Text>
                <Text style={[styles.statValue, { color: Brand.onTertiaryContainer }]}>Optimal</Text>
              </View>
            </View>
          </View>

          <Text style={[styles.h2, { marginTop: 28 }]}>Master your trends across days, weeks, and months.</Text>
          <Text style={styles.bodyLg}>
            Our powerful comparison engine highlights cost shifts before they eat your profit. Track ingredient
            volatility and identify exactly which menu items need price adjustments for maximum impact.
          </Text>
          {[
            'Ingredient volatility alerts',
            'Historical margin benchmarking',
            'Automated seasonal forecasting',
          ].map((line) => (
            <View key={line} style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={22} color={Brand.primary} />
              <Text style={styles.bulletText}>{line}</Text>
            </View>
          ))}
        </View>

        <View style={styles.trustSection}>
          <View style={styles.trustLogos}>
            {['KITCHEN CO.', 'PLATE & FORK', 'THE GOURMET', 'SAVOR.'].map((name) => (
              <Text key={name} style={styles.trustLogoText}>
                {name}
              </Text>
            ))}
          </View>
          <View style={styles.quoteCard}>
            <Ionicons name="chatbox-ellipses-outline" size={40} color={`${Brand.primary}33`} style={styles.quoteIcon} />
            <Text style={styles.quoteText}>
              {`"less. changed the way we look at our menu. We found that our signature risotto was losing us money due to rice price shifts we hadn't noticed. Now, we're optimized every single week."`}
            </Text>
            <View style={styles.quoteAuthor}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>ER</Text>
              </View>
              <View>
                <Text style={styles.authorName}>Elena Rodriguez</Text>
                <Text style={styles.authorRole}>Founder, Savor Collective</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[Brand.onPrimaryContainer, '#1a2e1a']}
            style={styles.ctaCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaTitle}>Join the future of restaurant management.</Text>
            <Text style={styles.ctaSub}>
              Stop guessing your food costs. Start maximizing your profit with the tools designed for the modern
              kitchen.
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.push('/register')}
              activeOpacity={0.9}
            >
              <Text style={styles.ctaButtonText}>Get Started for Free</Text>
            </TouchableOpacity>
            <Text style={styles.ctaFinePrint}>No credit card required. Cancel anytime.</Text>
          </LinearGradient>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
          <Text style={styles.footerBrand}>less.</Text>
          <View style={styles.footerLinks}>
            <Pressable>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.footerLink}>Contact Support</Text>
            </Pressable>
          </View>
          <Text style={styles.footerCopy}>© 2026 less. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Brand.background,
  },
  header: {
    backgroundColor: `${Brand.surface}CC`,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Brand.outlineVariant,
  },
  headerInner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  logoWordmark: {
    fontSize: 22,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: -0.5,
  },
  navScroll: {
    gap: 16,
    paddingVertical: 4,
    alignItems: 'center',
  },
  navLink: {
    fontSize: 13,
    fontWeight: '600',
    color: Brand.onSurfaceVariant,
    marginRight: 16,
  },
  navLinkActive: {
    color: Brand.primary,
    borderBottomWidth: 2,
    borderBottomColor: Brand.primary,
    paddingBottom: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    flexShrink: 0,
  },
  loginBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  loginBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Brand.onSurfaceVariant,
  },
  getStartedBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Brand.primaryContainer,
  },
  getStartedBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Brand.onPrimaryContainer,
  },
  scroll: {
    flex: 1,
  },
  sectionPad: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: Brand.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Brand.onSecondaryContainer,
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600',
    color: Brand.onSurface,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  h1Accent: {
    color: Brand.primary,
    fontStyle: 'italic',
  },
  bodyLg: {
    fontSize: 17,
    lineHeight: 26,
    color: Brand.onSurfaceVariant,
    marginBottom: 20,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  primaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Brand.primary,
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    shadowColor: Brand.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryCtaText: {
    color: Brand.onPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryCta: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: Brand.surfaceContainer,
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
  },
  secondaryCtaText: {
    color: Brand.onSurface,
    fontSize: 15,
    fontWeight: '700',
  },
  heroImageWrap: {
    marginTop: 28,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  heroGlow: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    top: '20%',
    bottom: '20%',
    borderRadius: 999,
  },
  heroCard: {
    backgroundColor: Brand.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
    backgroundColor: Brand.surfaceContainerLow,
  },
  processSection: {
    backgroundColor: Brand.surfaceContainerLow,
    paddingVertical: 48,
    paddingHorizontal: 20,
    marginTop: 32,
  },
  h2Center: {
    fontSize: 26,
    fontWeight: '600',
    color: Brand.onSurface,
    textAlign: 'center',
    marginBottom: 12,
  },
  subCenter: {
    fontSize: 16,
    lineHeight: 24,
    color: Brand.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 560,
    alignSelf: 'center',
  },
  processCards: {
    gap: 16,
  },
  processCard: {
    backgroundColor: Brand.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  processIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: Brand.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: Brand.onSurface,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: Brand.onSurfaceVariant,
  },
  analysisCard: {
    backgroundColor: Brand.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  caption: {
    fontSize: 13,
    color: Brand.onSurfaceVariant,
    marginTop: 4,
  },
  livePill: {
    backgroundColor: Brand.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  livePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Brand.onSecondaryContainer,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: BAR_MAX + 8,
    gap: 6,
    paddingHorizontal: 8,
  },
  barCell: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  barFill: {
    backgroundColor: Brand.surfaceContainerHighest,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 8,
  },
  barFillAccent: {
    backgroundColor: Brand.primaryContainer,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Brand.outlineVariant,
    marginTop: 20,
    paddingTop: 20,
    gap: 12,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Brand.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  h2: {
    fontSize: 26,
    fontWeight: '600',
    color: Brand.onSurface,
    lineHeight: 34,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  bulletText: {
    fontSize: 16,
    color: Brand.onSurface,
    flex: 1,
  },
  trustSection: {
    marginTop: 40,
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Brand.outlineVariant,
    backgroundColor: Brand.surfaceContainerLowest,
    gap: 28,
  },
  trustLogos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    opacity: 0.45,
  },
  trustLogoText: {
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
    color: Brand.onSurfaceVariant,
  },
  quoteCard: {
    backgroundColor: Brand.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
    borderRadius: 16,
    padding: 28,
    position: 'relative',
  },
  quoteIcon: {
    position: 'absolute',
    top: -8,
    left: 20,
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '600',
    color: Brand.onSurface,
    lineHeight: 30,
    marginBottom: 24,
    marginTop: 12,
  },
  quoteAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Brand.primaryContainer,
    borderWidth: 2,
    borderColor: Brand.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '800',
    color: Brand.onPrimaryContainer,
    fontSize: 14,
  },
  authorName: {
    fontWeight: '800',
    fontSize: 16,
    color: Brand.onSurface,
  },
  authorRole: {
    fontSize: 13,
    color: Brand.onSurfaceVariant,
    marginTop: 2,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  ctaCard: {
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    overflow: 'hidden',
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: Brand.onPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSub: {
    fontSize: 17,
    lineHeight: 26,
    color: Brand.primaryFixed,
    textAlign: 'center',
    opacity: 0.95,
    marginBottom: 24,
    maxWidth: 340,
  },
  ctaButton: {
    backgroundColor: Brand.primaryContainer,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: Brand.onPrimaryContainer,
  },
  ctaFinePrint: {
    marginTop: 20,
    fontSize: 13,
    color: Brand.primaryFixed,
    opacity: 0.55,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    alignItems: 'center',
    gap: 20,
    backgroundColor: Brand.surfaceContainerLow,
    borderTopWidth: 1,
    borderTopColor: Brand.outlineVariant,
  },
  footerBrand: {
    fontSize: 22,
    fontWeight: '900',
    color: Brand.primary,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  footerLink: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Brand.onSurfaceVariant,
    textDecorationLine: 'underline',
    textDecorationColor: `${Brand.primary}55`,
  },
  footerCopy: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Brand.onSurfaceVariant,
    opacity: 0.6,
    textAlign: 'center',
  },
});
