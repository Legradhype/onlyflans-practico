import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'


import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'


import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

import DashboardPage from './pages/creator/DashboardPage'
import EditProfilePage from './pages/creator/EditProfilePage'
import CreateGoalPage from './pages/creator/CreateGoalPage'
import CreatePostPage from './pages/creator/CreatePostPage'
import IncomeReportPage from './pages/creator/IncomeReportPage'
import MyPostsPage from './pages/creator/MyPostsPage'


import FeedPage from './pages/follower/FeedPage'
import CreatorsListPage from './pages/follower/CreatorsListPage'
import CreatorProfilePage from './pages/follower/CreatorProfilePage'
import FavoritesPage from './pages/follower/FavoritesPage'
import DonationHistoryPage from './pages/follower/DonationHistoryPage'

import NotFoundPage from './pages/NotFoundPage'

function HomeRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'CREATOR') return <Navigate to="/creator/dashboard" replace />
  return <Navigate to="/feed" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>


      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>

          <Route element={<RoleRoute role="CREATOR" />}>
            <Route path="/creator/dashboard" element={<DashboardPage />} />
            <Route path="/creator/profile" element={<EditProfilePage />} />
            <Route path="/creator/goals/new" element={<CreateGoalPage />} />
            <Route path="/creator/posts" element={<MyPostsPage />} />
            <Route path="/creator/posts/new" element={<CreatePostPage />} />
            <Route path="/creator/income" element={<IncomeReportPage />} />
          </Route>

          <Route element={<RoleRoute role="FOLLOWER" />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/donations/history" element={<DonationHistoryPage />} />
          </Route>

          <Route path="/creators" element={<CreatorsListPage />} />
          <Route path="/creators/:id" element={<CreatorProfilePage />} />
        </Route>
      </Route>


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
