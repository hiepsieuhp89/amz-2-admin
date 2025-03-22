'use client';
import { useGetProfileData } from '@/hooks/authentication';
import { useGetAllCategories } from '@/hooks/category';
import { useGetAllImages } from '@/hooks/image';
import { useGetAllSellerPackages } from '@/hooks/seller-package';
import { Box, Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material';
import { CategoryOutlined, ImageOutlined, PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';

const StatCard = ({ title, value, icon, loading }: { title: string, value: number | string, icon: React.ReactNode, loading?: boolean }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6" color="textSecondary">
                        {title}
                    </Typography>
                    {loading ? (
                        <CircularProgress size={20} />
                    ) : (
                        <Typography variant="h4">
                            {value}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ color: 'primary.main' }}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

function HomePage() {
    const { profileData, isLoading: profileLoading } = useGetProfileData();
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();
    const { data: images, isLoading: imagesLoading } = useGetAllImages();
    const { data: sellerPackages, isLoading: packagesLoading } = useGetAllSellerPackages();

    return (
        <Box className='p-8'>
            <Typography variant="h2" mb={4}>Dashboard Overview</Typography>

            <Grid container spacing={3}>
                {/* User Profile Card */}
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Welcome"
                        value={profileData?.fullName || profileData?.username || 'User'}
                        icon={<PersonOutline sx={{ fontSize: 40 }} />}
                        loading={profileLoading}
                    />
                </Grid>

                {/* Categories Count */}
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Categories"
                        value={categories?.data?.length || 0}
                        icon={<CategoryOutlined sx={{ fontSize: 40 }} />}
                        loading={categoriesLoading}
                    />
                </Grid>

                {/* Images Count */}
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Images"
                        value={images?.data?.length || 0}
                        icon={<ImageOutlined sx={{ fontSize: 40 }} />}
                        loading={imagesLoading}
                    />
                </Grid>

                {/* Seller Packages Count */}
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Seller Packages"
                        value={sellerPackages?.data?.length || 0}
                        icon={<ShoppingBagOutlined sx={{ fontSize: 40 }} />}
                        loading={packagesLoading}
                    />
                </Grid>
            </Grid>

            {/* Additional content can be added here */}
            <Box mt={4}>
                <Typography variant="body1" color="textSecondary">
                    Welcome to your dashboard. Here you can manage your categories, images, and seller packages.
                </Typography>
            </Box>
        </Box>
    );
} 
export default HomePage;